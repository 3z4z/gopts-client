import { use } from "react";

export default function FaqAccordions({ getFaqs }) {
  const faqs = use(getFaqs);
  return (
    <>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="collapse collapse-arrow bg-base-100 border border-base-300 border-b-0 last:border-b rounded-b-none last:rounded-b-lg rounded-t-none first:rounded-t-lg not-first:border-t-base-200"
        >
          <input
            type="radio"
            name="faq"
            className="peer"
            defaultChecked={index === 0}
          />
          <div className="collapse-title font-semibold peer-checked:text-accent peer-checked:font-bold transition-all peer-checked:[&::after]:text-accent">
            {index + 1}. {faq.question}
          </div>
          <div className="collapse-content text-sm bg-base-200/50">
            <div className="pt-4">{faq.answer}</div>
          </div>
        </div>
      ))}
    </>
  );
}
