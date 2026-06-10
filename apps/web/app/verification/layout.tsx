const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      {children}
    </div>
  )
}

export default Layout
