const Loader = () => {
  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-25%);
            }
          }

          .animate-bounce {
            animation: bounce 1s infinite;
          }

          .delay-300 {
            animation-delay: .3s;
          }

          .delay-700 {
            animation-delay: .7s;
          }

          .flex {
            display: flex;
          }

          .flex-row {
            flex-direction: row;
          }

          .gap-2 {
            gap: 0.5rem;
          }

          .w-4 {
            width: 1rem;
          }

          .h-4 {
            height: 1rem;
          }

          .rounded-full {
            border-radius: 9999px;
          }

          .bg-blue-700 {
            background-color: #1D4ED8;
          }
        `}
      </style>
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce delay-700"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce delay-300"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce delay-700"></div>
      </div>
    </>
  );
};

export default Loader;
