import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  const breadcrumbPaths = [
    { name: 'Dashboard', url: '/dashboard' },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return { name: segment.charAt(0).toUpperCase()+segment.slice(1), url: path };
    })
  ];
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbPaths.map((path, index) => (
          <li key={index} className="inline-flex items-center">
            {index !== breadcrumbPaths.length - 1 ? (
              <div className="flex items-center">
                <Link to={path.url} className="inline-flex items-center text-sm font-bold text-gray-800 hover:text-gray-900 dark:text-zinc-100 dark:hover:text-white ">
                  {path.name}
                </Link>
                <span className="ml-4">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule='evenodd'></path>
                  </svg>
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                {/* <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule='evenodd'></path>
                </svg> */}
                <a href="#" className="capitalize text-sm font-medium text-gray-500 hover:text-gray-900 md:ml-2 dark:text-gray-100 dark:hover:text-white">{path.name}</a>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
