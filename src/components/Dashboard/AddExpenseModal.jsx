import React, { useState } from "react";
import styles from "./AddExpenseModal.module.css";
import axios from "axios";
import ChoosePayerModal from "./ChoosePayerModal";

export default function AddExpenseModal({ onClose, userId }) {
  const [friend, setFriend] = useState(null); // selected friend object
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [payer, setPayer] = useState("you");
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch friends list
  const fetchFriends = async (query = "") => {
    try {
      const res = await axios.get(`/api/users/search?q=${query}`);
      // Normalize so frontend can always use f.id
      const normalized = res.data.map((f) => ({ ...f, id: f._id }));
      setFriendSuggestions(normalized || []);
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  const handleSave = async () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid description and amount.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("amount", parseFloat(amount));
      formData.append("splitWith", friend ? friend.id : "");
      formData.append("paidBy", payer === "you" ? userId : "multiple");
      formData.append("splitType", "equal");
      formData.append("notes", notes);
      if (image) formData.append("image", image);

      await axios.post(`/api/users/${userId}/expenses`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onClose();
    } catch (err) {
      console.error("Error saving expense:", err);
      alert("Failed to save expense. Please try again.");
    }
  };

  const numPeople = friend ? 2 : 1;
  const perPerson = amount
    ? (parseFloat(amount) / numPeople).toFixed(2)
    : "0.00";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h3>Add an expense</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <label>With you and:</label>
          <input
            type="text"
            placeholder="Enter names or email addresses"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              setShowSuggestions(true);
              fetchFriends(value);
            }}
            onFocus={() => {
              fetchFriends();
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && friendSuggestions.length > 0 && (
            <ul className={styles.suggestionsList}>
              {friendSuggestions
                .filter((f) =>
                  f.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((f) => (
                  <li
                    key={f.id}
                    onClick={() => {
                      setFriend(f);
                      setInputValue(f.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {f.name}
                  </li>
                ))}
            </ul>
          )}

          <div className={styles.expenseRow}>
            <img
              src="../general@2x.png"
              alt="Expense"
              className={styles.expenseIcon}
            />
            <input
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <input
            type="number"
            placeholder="₹ 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.amountInput}
          />

          <p>
            Paid by{" "}
            <span
              className={styles.clickable}
              onClick={() => setShowPayerModal(true)}
            >
              <strong>
                {payer === "you"
                  ? "you"
                  : payer === "multiple"
                  ? "multiple people"
                  : payer}
              </strong>
            </span>{" "}
            and split <strong>equally</strong>{" "}
            <span className={styles.perPerson}>(₹{perPerson}/person)</span>
          </p>

          {/* Sub modal */}
          {showPayerModal && (
            <ChoosePayerModal
              onClose={() => setShowPayerModal(false)}
              onSelect={(selected, data) => {
                if (selected === "multiple") {
                  setPayer("multiple");
                  console.log("Multiple payer amounts:", data);
                } else {
                  setPayer("you");
                }
              }}
            />
          )}

          <div className={styles.optionsRow}>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            {/* Notes textarea */}
            {notes !== "" ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes..."
                className={styles.notesBox}
              />
            ) : (
              <button className={styles.linkBtn} onClick={() => setNotes("")}>
                Add notes
              </button>
            )}

            {/* Image upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className={styles.fileInput}
            />

            <button
              className={styles.linkBtn}
              onClick={() => alert("Group selection not implemented yet")}
            >
              No group
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} className={styles.saveBtn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
