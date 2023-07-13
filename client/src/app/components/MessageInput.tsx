import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";

const MessageInput = ({
  inputValue,
  setInputValue,
  placeholder,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <InputGroup className="w-full">
      <Input
        variant="outline"
        size="lg"
        focusBorderColor="#ffffff0"
        className="rounded-full bg-white dark:bg-black border border-borderGray focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <InputRightElement className="h-full">
        <button
          type="submit"
          className="justify-center flex items-center h-full"
          disabled={inputValue.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={`w-6 h-6 stroke-black dark:stroke-white ${
              inputValue.length === 0 ? "fill-none" : "fill-accentBlue"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </InputRightElement>
    </InputGroup>
  );
};

export default MessageInput;
