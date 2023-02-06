const TxLink = (props) => {
  const { txHash } = props;
  return ( 
    <div>
      view on 
      <a href={`https://hyperspace.filfox.info/en/tx/${txHash}`} target="_blank" rel="noreferrer noopener" className="text-blue-500 hover:text-blue-400 cursor-pointer ml-1" >
        FILFOX
      </a> 
    </div>
  )
}

export default TxLink;