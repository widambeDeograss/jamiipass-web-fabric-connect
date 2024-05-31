import React from 'react'

type propTypes = {
   title:string;
   type:string;
}
const BreadCrumb = (props:propTypes) => {
  return (
    <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
      { props.title }
    </h2>

    <nav>
      <ol className="flex items-center gap-2">
        <li>
          <a className="font-medium" href="/"> {props.type} / </a>
        </li>
        <li className="font-medium text-primary">{ props.title }</li>
      </ol>
    </nav>
  </div>
    </div>
  )
}

export default BreadCrumb