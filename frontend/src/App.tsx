import Canvas from "./components/Canvas";

const App = () => {
  return (
    <div className="flex p-10 flex-col h-screen items-center w-full justify-center font-dmsans tracking-widest font-semibold bg-light-gray text-dark-gray">
      <div className="animate-fade flex flex-col items-center space-y-20 border border-orange py-16 px-20 shadow-lg rounded-lg">
        <h1 className="text-5xl">Robot Game</h1>
        <div className="flex">
          <div className="pr-10">
            <Canvas gridSize={500} />
          </div>
          <div className="border-l border-gray-300 pl-10 space-y-5">
            <h3 className="text-orange text-lg">How To Play</h3>
            <p>Use the arrow keys to move the character around the grid.</p>
            <div className="text-sm leading-6">
              <p>Arrow Up (↑): Moves the robot one square up.</p>
              <p>Arrow Right (→): Moves the robot one square to the right.</p>
              <p>Arrow Down (↓): Moves the robot one square down.</p>
              <p>Arrow Left (←): Moves the robot one square to the left.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
