"use client"
import { useRouter, useSearchParams} from "next/navigation"
import Button from "@/shared/components/button/button";
import Footer from "@/shared/components/Footer/Footer";
import style from "./redirectionPopup.module.css";
import Image from "next/image";

const RedirectionPopup = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const total = searchParams.get("total") || "567";
    const items = searchParams.get("items") || "3";
    const paymentMethod = searchParams.get("paymentMethod") || "PIX";


    const handlePayment = async () => {
        const orderId = `order_${Date.now()}`;
    
        try {
            const response = await fetch("/demoapp/api/proxy", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    "order.order_id": orderId,
                    "merchant_id": "latamsbx", // Demo sandbox merchant ID
                    "payment_method_type": "RTP",
                    "payment_method": "PIX_PISP_ITAU",
                    "format": "json",
                    "order.amount": total === "0" ? "1" : total,
                    "order.currency": "BRL",
                    "order.return_url": `https://google.com`,
                    "order.billing_address_postal_code": "22750012",
                    "order.billing_address_first_name": "Sohini",
                    "order.billing_address_last_name": "Sohini",
                    "order.billing_address_line1": "Koramagal",
                    "order.billing_address_line2": "India",
                    "order.billing_address_line3": "random",
                    "order.billing_address_city": "Rio de Janeiro",
                    "order.billing_address_state": "RJ",
                    "order.billing_address_country": "BR",
                    "identity_credentials": JSON.stringify({ cpf: "75367191088" }), // Test CPF for sandbox
                    "redirect_after_payment": "true",
                    "order.metadata.ITAU:gateway_reference_id": "itau",
                }),
            });
    
            router.push(`itauLogin?total=${total}&items=${items}&paymentMethod=${encodeURIComponent(paymentMethod)}`);
    
            const result = await response.json();
            console.log("Payment Response:", result);
    
    
            if (result && result.payment?.authentication?.url) {
                const proxyUrl = `/demoapp/api/proxy?url=${encodeURIComponent(result.payment.authentication.url)}`;
                
                const authResponse = await fetch(proxyUrl);
                const authData = await authResponse.json();
                
                console.log("Auth Proxy Response:", authData);
    
            } else {
                console.log("Payment initiation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };
    return(
        <div className={style.container}>
                 <div className={style.openfinance}></div>
                <div className={style.imageContainer}>
                    <div className={style.nsImageContainer}>
                        <Image src={`/demoapp/image/bankImage/NS.svg`} alt="NSImage" height={28} width={26} priority/>
                    </div>
                    <div className={style.caretRightContainer}>
                        <div className={style.caretRight}></div>
                        <div className={style.caretRight}></div>
                        <div className={style.caretRight}></div>
                    </div>
                    <div className={style.itauBankContainer}>
                        <Image src={`/demoapp/image/bankImage/itau.svg`} alt="itau" height={48} width={48} priority/>
                    </div>
                </div>
                <div className={style.headerText}>Autorize o seu pagamento</div>
                <div className={style.content}>Você será redirecionado para autorizar o pagamento em seu banco. Confirme seu saldo e limite Pix para o valor de <span className={style.total}>R$ 567.</span></div>

                <Button text="Autorizar no banco" onClick={handlePayment}/>
                <Footer/>
        </div>
       
    );
}

export default RedirectionPopup