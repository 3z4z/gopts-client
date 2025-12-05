export default function SectionTitleComponent({ title, subtitle }) {
  return (
    <div className="text-center pb-20">
      <h3 className="text-primary text-4xl mb-3 capitalize">{title}</h3>
      <p className="text-neutral/60">{subtitle}</p>
    </div>
  );
}
