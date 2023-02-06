const Button = (props) => {
  const { loading, text, onClick } = props;
  const action = () => {
    if (!loading) {
      onClick();
    }
  }
  return (
    <div
      className={`h-10 select-none bg-gray-600 rounded-full px-2 w-1/2 mx-auto my-1 flex justify-around items-center
        ${loading ? 'opacity-50 cursor-not-allowed disabled' : 'hover:bg-gray-500 hover:cursor-pointer duration-150 ease-in-out '}
      `}
      onClick={() => action()}
    >
      {text}
      {
        loading &&
        <svg className="h-5 w-5 mr-3 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }                
    </div>
  );
}

export default Button;