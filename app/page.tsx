import Text from "./components/Text";

export const metadata = {
  title: "Solution Sprint",
  description: "🎙️ > 📝",
};

export default function Home() {
  return (
    <div className="hero min-h-screen bg-mobile-bg">
      <div className="flex items-center  flex-col  gap-5  ">
        <Text />
      </div>
    </div>
  );
}
