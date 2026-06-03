interface ButtonProps {
  label: string;
  onPress: () => void;
}

export const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <button
      onClick={onPress}
      className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-6 py-3 rounded-xl shadow-md transition-all"
    >
      <span className="text-white font-semibold text-center">{label}</span>
    </button>
  );
};
