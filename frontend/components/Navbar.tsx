function Navbar() {
  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 text-gray-900 dark:text-gray-200"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="hidden lg:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6"
          >Features</a
          >
          <a href="#" className="text-sm font-semibold leading-6"
          >Marketplace</a
          >
          <a href="#" className="text-sm font-semibold leading-6"
          >Company</a
          >
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6"
          >
            Join our Discord <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </nav>
    </header>
)
}

export default Navbar;