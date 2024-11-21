function HeaderLink ({ text, href }) {
  const module = href => {
      
  }
  return (
    <div className='hover:cursor-pointer hover:underline p-2 -m-2'>
      <a onClick={module(href)}>{text}</a>
    </div>
  )
}

export default HeaderLink
