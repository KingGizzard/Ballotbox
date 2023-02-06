const TxLink = (props) => {
  const { txHash } = props;
  return (
    !!txHash ?
    <div>
      view on 
      <a href={`https://explorer.glif.io/tx/${txHash}/?network=hyperspace`} target="_blank" rel="noreferrer noopener" className="text-blue-500 hover:text-blue-400 cursor-pointer ml-1" >
        Glif
      </a> 
    </div> : 
    <div />
  )
}

export default TxLink;