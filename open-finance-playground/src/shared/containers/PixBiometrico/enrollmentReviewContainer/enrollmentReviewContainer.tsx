"use client";
import React from "react";
import style from "./enrollmentReviewContainer.module.css";
import Button from "@/shared/components/button/button";

type EnrollmentReviewContainerProps = {
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
};

const EnrollmentReviewContainer: React.FC<EnrollmentReviewContainerProps> = ({
  goToNextStep,
  goToPreviousStep,
}) => {
  const expirationDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 5);
    return d.toLocaleDateString("pt-BR");
  })();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.headerSubtitle}>Meu Banco</div>
        <div className={style.headerTitle}>Revise as informações do vínculo</div>
        <span className={style.devicePill}>Nome do dispositivo autorizado</span>
      </div>

      <div className={style.body}>
        <div>
          <div className={style.sectionLabel}>Resumo da solicitação</div>
          <div className={style.card}>
            <div className={style.row}>
              <span className={style.rowLabel}>Identificação do cliente</span>
              <span className={style.rowValue}>CPF: ***.498.166-**</span>
              <span className={style.rowValue}>Alice B. Charlie</span>
            </div>
            <div className={style.divider} />
            <div className={style.row}>
              <span className={style.rowLabel}>Identificação da conta</span>
              <span className={style.rowValue}>Meu Banco</span>
              <span className={style.rowValue}>Ag 1234 | Cc 29859-4</span>
            </div>
            <div className={style.divider} />
            <div className={style.row}>
              <span className={style.rowLabel}>Prazo de autorização</span>
              <span className={style.rowValue}>5 anos ({expirationDate})</span>
            </div>
          </div>
        </div>

        <div>
          <div className={style.sectionLabel}>Limites</div>
          <div className={style.card}>
            <div className={style.row}>
              <span className={style.rowLabel}>Valor máximo por dia</span>
              <span className={style.rowValue}>—</span>
            </div>
            <div className={style.divider} />
            <div className={style.row}>
              <span className={style.rowLabel}>Valor máximo por transação</span>
              <span className={style.rowValue}>R$ 500,00</span>
            </div>
          </div>
        </div>

        <div className={style.importante}>
          <div className={style.importanteHeader}>IMPORTANTE</div>
          <div>O saldo e o limite da sua conta estão sendo compartilhados.</div>
          <div style={{ marginTop: 8, fontWeight: 600, color: "#18191B" }}>Saldo</div>
          <ul className={style.importanteList}>
            <li>Informações da conta</li>
            <li>Saldo disponível</li>
            <li>Saldo bloqueado</li>
            <li>Outros saldos</li>
          </ul>
          <div style={{ marginTop: 8, fontWeight: 600, color: "#18191B" }}>Limite</div>
          <ul className={style.importanteList}>
            <li>Informações da conta</li>
            <li>Limite utilizado</li>
            <li>Limite contratado de cheque especial</li>
          </ul>
        </div>

        <div className={style.iniciadora}>
          <span className={style.iniciadoraLabel}>Iniciadora</span>
          <span className={style.iniciadoraValue}>Cumbuca IP LTDA</span>
        </div>
      </div>

      <div className={style.footer}>
        <div className={style.footerHint}>
          Ao confirmar, você será levado de volta para a Iniciadora
        </div>
        <div className={style.buttonRow}>
          <Button
            text="Confirmar"
            meubank={true}
            onClick={() => goToNextStep?.()}
            styles={{ background: "#820AD1", width: "100%", fontFamily: "Inter" }}
          />
          <Button
            text="Cancelar"
            meubank={true}
            active={false}
            onClick={() => goToPreviousStep?.()}
            styles={{
              border: "1px solid #820AD1",
              color: "#820AD1",
              width: "100%",
              fontFamily: "Inter",
              background: "#FFFFFF",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollmentReviewContainer;
