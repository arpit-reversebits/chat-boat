
import React from 'react';

type ChatboatDashBoardProps = {
  userEmail?: string;
};

const ChatboatDashBoard = ({ userEmail }: ChatboatDashBoardProps) => {
  return <div>Chatboat Dashboard Component {userEmail && `(User: ${userEmail})`}</div>;
};

export default ChatboatDashBoard;
