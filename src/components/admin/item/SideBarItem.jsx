export default function SideBarItem({ icon, text }) {
  return (
    <li className="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 p-3 rounded-lg">
      {icon}
      <span>{text}</span>
    </li>
  );
}
