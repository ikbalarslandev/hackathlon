import Text from "./components/Text";

export const metadata = {
  title: "Hackathlon",
  description: "🎙️ > 📝",
};

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:gap-48 gap-5 lg:flex-row-reverse">
        <Text />
      </div>
    </div>
  );
}
