type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ ...props }: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  );
}

export default TextArea;