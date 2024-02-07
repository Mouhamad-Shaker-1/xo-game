
export default function Game(props) {
  const squarsElement = props.squarsRow.map((row, index) => {
    const rowOfSquares = row.map((square) => {
      return (
        <button
          className='square'
          key={square.id}
          value={square.value}
          onClick={(e) => props.takeTrun(e, square.id)}
        >
          {square.value}
        </button>
      );
    });
      
    return (
      <div key={index} className='squareRow'>
        {rowOfSquares}
      </div>
    );
  });

  return <div className='containerGame'>{squarsElement}</div>;
}
