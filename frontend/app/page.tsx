"use client"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Pagination, RefinementList, HierarchicalMenu, ClearRefinements, RangeInput, CurrentRefinements } from 'react-instantsearch-hooks-web';
import 'instantsearch.css/themes/algolia.css';
import { useHits } from 'react-instantsearch-hooks-web';
import GridList from "react-gridlist";
import { useState } from 'react';

function getGridGap(elementWidth: number, windowHeight: number) {
  if (elementWidth > 720 && windowHeight > 480) {
    return 10
  } else {
    return 5
  }
}

function getColumnCount(elementWidth: number, gridGap: number) {
  return Math.floor((elementWidth + gridGap) / (250 + gridGap))
}

function getWindowMargin(windowHeight: number) {
  return Math.round(windowHeight * 1.5)
}

function getItemData(image: any, columnWidth: number) {
  let imageRatio = image.image.height / image.image.width
  let adjustedHeight = Math.round(columnWidth * imageRatio)

  return {
    key: image.image.url,
    height: adjustedHeight,
  }
}

const searchClient = algoliasearch(
  '0EP2Y7UUUX',
  'ae611d14f0b56aaa064f6cce5bbaa7ff'
);

function Hit({ hit }) {
  return (
    <a href="#" className='group block mb-3 px-2 py-4 dark:bg-bg-secondary-dark dark:rounded-3xl rounded-3xl bg-white h-full'>
      <div className='bg-white h-[150px] rounded-[16px]'>
        <img className='h-full w-full object-contain' src={hit.image} />
      </div>
      <div className='mt-3 flex justify-between text-sm px-3'>
        <div className='flex flex-col gap-3'>
          <h3 className="font-medium text-gray-900 dark:text-gray-300 group-hover:underline group-hover:underline-offset-4 line-clamp-2">
            {hit.title}
          </h3>
          <div className="flex flex-row justify-between items-center">
            <span className='text-xl font-black dark:text-gray-200'>
              ${Number(hit.price).toFixed(2)}
            </span>
            <span className='text-sm font-black text-green-700 dark:text-green-400'>Save $1,540 (50%)</span>
          </div>
          <a
            className="w-full block rounded bg-accent dark:bg-accent-dark p-2 font-black transition text-white hover:bg-green-700 flex items-center justify-center"
            href={hit.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Amazon &nbsp;<span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </a>
  );
}

function HitsGrid(props) {
  const { hits } = useHits(props);

  return (
    <div className='w-full'>
      <GridList
        items={hits}
        getGridGap={getGridGap}
        getColumnCount={getColumnCount}
        getWindowMargin={getWindowMargin}
        getItemData={getItemData}
        renderItem={(hit) => {
          return (
            <Hit hit={hit} />
          )
        }}
      />
    </div>
  );
}

export default function Home() {
  const [filtersVisible, setFiltersVisible] = useState(false)
  return (
    <InstantSearch searchClient={searchClient} indexName="amazon" insights={true}>
      <div className='flex flex-col gap-3 '>
        <SearchBox />
        <div className='flex flex-col md:flex-row gap-3 h-full w-full'>
          <button className='flex flex-col gap-3 bg-bg-secondary text-gray-700 dark:text-gray-200 dark:bg-bg-secondary-dark  py-3 rounded text-sm font-bold rounded-lg' onClick={(e) => {
            if (e.target === e.currentTarget) return;
            e.preventDefault()
            setFiltersVisible(!filtersVisible)
            }}>
            <div className='flex flex-col w-full px-4'>
                <div className='flex flex-col items-center sm:flex-row md:flex-col my-4 items-start rounded-md w-full h-full'>
                  <div className='rounded-md p-3'>
                    <RefinementList
                      attribute="category"
                      searchablePlaceholder="Search categories"
                      showMore={true}
                      searchable={true}
                      classNames={{
                        root: 'flex flex-col gap-1',
                        list: 'items-start flex flex-col',
                        labelText: 'mx-2',
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-3 rounded-md p-3 h-full'>
                    <div className='flex flex-col'>
                      <div className='flex flex-row justify-between items-center'>
                        <span className='text-sm font-bold'>Used Price</span>
                      </div>
                      <RangeInput
                        attribute="price"
                        min={0}
                        max={10000}
                        precision={2}
                        className='w-full p-2'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <div className='flex flex-row justify-between items-center'>
                        <span className='text-sm font-bold'>New Price</span>
                      </div>
                      <RangeInput
                        attribute="price"
                        min={0}
                        max={10000}
                        precision={2}
                        className='w-full p-2'
                      />
                    </div>
                  </div>
                </div>
            </div>
          </button>
          <div className='h-full w-full flex flex-col gap-2'>
            <CurrentRefinements />
            <HitsGrid />
          </div>
        </div>
      </div>
    </InstantSearch>
  )
}
