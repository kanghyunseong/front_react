import React, { useEffect } from "react";

const modalStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  background: "rgba(0,0,0,0.5)"
};

const boxStyle = {
  width: "min(600px, 90%)",
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxSizing: "border-box"
};

export default function ReportModal({ open, onClose, onSubmit, targetLabel }) {
  // targetLabel: "게시글" / "댓글" 등 표시용
  const [reason, setReason] = React.useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!reason.trim()) return alert("신고 사유를 입력해주세요.");
    onSubmit(reason.trim());
  };

  return (
    <div style={modalStyle} onMouseDown={onClose}>
      <div style={boxStyle} onMouseDown={(e) => e.stopPropagation()}>
        <h3>{targetLabel} 신고</h3>
        <p style={{ marginTop: 0, color: "#666" }}>
          신고 사유를 구체적으로 작성해 주세요. 운영자가 확인 후 처리합니다.
        </p>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={6}
          style={{ width: "100%", boxSizing: "border-box", padding: "8px", marginTop: "8px" }}
          placeholder="신고 사유를 입력하세요 (예: 욕설, 허위사실 등)"
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
          <button onClick={onClose} style={{ marginRight: "8px" }}>
            취소
          </button>
          <button onClick={handleSubmit} style={{ background: "#007bff", color: "#fff" }}>
            신고접수
          </button>
        </div>
      </div>
    </div>
  );
}