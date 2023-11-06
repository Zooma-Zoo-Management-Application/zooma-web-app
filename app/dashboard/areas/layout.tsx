function Layout({children}:any) {

  return (
    <div className='w-full'>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout