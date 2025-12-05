import { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalBox,
  ModalTitle,
  ModalDescription,
  ModalTextarea,
  ModalButtonRow,
  ModalButton,
  CancelButton,
} from "./ReportModal.styles";

export default function ReportModal({
  open,
  onClose,
  onSubmit,
  targetLabel = "대상",
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") safeOnClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  const safeOnClose = () => {
    if (typeof onClose === "function") onClose();
  };

  const handleSubmit = () => {
    const trimmed = reason.trim();
    if (!trimmed) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    if (typeof onSubmit !== "function") {
      console.error("[ReportModal] onSubmit 누락");
      alert("신고 처리 중 오류가 발생했습니다.");
      return;
    }

    try {
      onSubmit(trimmed);
    } catch (err) {
      console.error("신고 처리 오류:", err);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <ModalOverlay onMouseDown={safeOnClose}>
      <ModalBox onMouseDown={(e) => e.stopPropagation()}>
        <ModalTitle>{targetLabel} 신고</ModalTitle>
        <ModalDescription>
          신고 사유를 구체적으로 작성해 주세요. 운영자가 확인 후 처리합니다.
        </ModalDescription>

        <ModalTextarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 입력하세요 (예: 욕설, 허위사실 등)"
        />

        <ModalButtonRow>
          <CancelButton onClick={safeOnClose}>취소</CancelButton>
          <ModalButton onClick={handleSubmit}>신고접수</ModalButton>
        </ModalButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}
