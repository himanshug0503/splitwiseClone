import React, { useState } from "react";
import styles from "./AddExpenseModal.module.css";
import axios from "axios";
import ChoosePayerModal from "./ChoosePayerModal";

/**
 * Props:
 * - onClose: function
 * - userId: string (logged-in user id)
 * - token: string (JWT) - if not passed, this component will try localStorage 'token'
 */
export default function AddExpenseModal({
  onClose,
  userId: propUserId,
  token: propToken,
}) {
  const [friends, setFriends] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [payer, setPayer] = useState("you");
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ Use prop token / userId if provided, otherwise try localStorage
  const token =
    propToken ||
    (typeof window !== "undefined" && localStorage.getItem("token"));
  const userId =
    propUserId ||
    (typeof window !== "undefined" && localStorage.getItem("userId"));

  /** 🔍 Fetch friends from backend (must have valid JWT) */
  const fetchFriends = async (query = "") => {
    console.log("fetchFriends called:", query, "token present:", !!token); // debug
    if (!token) {
      console.warn("fetchFriends skipped: missing token");
      setFriendSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `/api/friends/search-friends?q=${encodeURIComponent(query)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const results = Array.isArray(res.data)
        ? res.data
        : res.data.friends || [];
      setFriendSuggestions(results);
    } catch (err) {
      console.error("fetchFriends error:", err.response?.data || err.message);
      setFriendSuggestions([]);
    }
  };

  const handleAddFriend = (f) => {
    if (!f || !f._id) return;
    if (!friends.find((fr) => fr._id === f._id)) {
      setFriends([...friends, f]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveFriend = (id) =>
    setFriends(friends.filter((f) => f._id !== id));

  /** ✅ Ensure friend exists in backend before saving expense */
  const saveFriend = async (friend) => {
    if (!token) return friend;
    try {
      const res = await axios.post(
        "/api/friends/add",
        { friendId: friend._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error("saveFriend error:", err.response?.data || err.message);
      return friend;
    }
  };

  const handleSave = async () => {
    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    if (!token) {
      alert("Missing authentication token. Please login again.");
      return;
    }

    // save friends first
    const savedFriends = [];
    for (const f of friends) {
      const saved = await saveFriend(f);
      savedFriends.push(saved);
    }

    const payload = {
      description: description.trim(),
      amount: parseFloat(amount),
      splitWith: savedFriends.map((f) => f._id),
      payer: payer === "you" ? userId || "unknown" : "multiple",
      splitType: "equal",
      notes,
    };

    try {
      const res = await axios.post("/api/expenses/add", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Expense saved:", res.data);
      onClose();
    } catch (err) {
      const serverData = err.response?.data;
      console.error("AddExpenseModal: save error:", serverData || err.message);
      alert(
        `Failed to save expense. ${
          serverData?.msg || serverData?.error || err.message || "Unknown error"
        }`
      );
    }
  };

  const numPeople = friends.length + 1;
  const perPerson = amount
    ? (parseFloat(amount) / numPeople).toFixed(2)
    : "0.00";

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <div className={styles.modalHeader}>
          <h3>Add an expense</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <label>With you and:</label>
          <div className={styles.friendInputWrapper}>
            <input
              type="text"
              placeholder="Enter friend name or email"
              value={inputValue}
              onChange={(e) => {
                const v = e.target.value;
                setInputValue(v);
                setShowSuggestions(true);
                fetchFriends(v);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              onFocus={() => inputValue && setShowSuggestions(true)}
            />

            {showSuggestions && friendSuggestions.length > 0 && (
              <ul className={styles.suggestionsList}>
                {friendSuggestions.map((f) => (
                  <li key={f._id} onMouseDown={() => handleAddFriend(f)}>
                    {f.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.selectedFriends}>
            {friends.map((f) => (
              <span key={f._id} className={styles.friendBadge}>
                {f.name}
                <button type="button" onClick={() => handleRemoveFriend(f._id)}>
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className={styles.expenseRow}>
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

          {showPayerModal && (
            <ChoosePayerModal
              onClose={() => setShowPayerModal(false)}
              onSelect={(selected) => {
                if (selected === "multiple") setPayer("multiple");
                else setPayer("you");
              }}
            />
          )}

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className={styles.notesBox}
          />
        </div>

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
