import React from "react";

const Header = () => {
  const Tab = (props) => {
    const { title } = props;
    return ( 
      <h1 className="rounded-full bg-gray-600 px-4 py-2 text-2xl select-none hover:bg-gray-500 cursor-pointer select-none duration-100 ease-in-out">
        {title}
      </h1>
    )
  }

  return (
    <header className="m-2 flex justify-center gap-4">
      <Tab title="Post Question" />
      <Tab title="Answer Questions" />
      <Tab title="View Answers" />
    </header>
  )
}

export default Header;