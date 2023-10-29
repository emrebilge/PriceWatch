"use client";
import algoliasearch from "algoliasearch/lite";
import {
	InstantSearch,
	SearchBox,
	Pagination,
	RefinementList,
	RangeInput,
	CurrentRefinements,
} from "react-instantsearch";
import "instantsearch.css/themes/algolia.css";
import { useHits, HitsPerPage } from "react-instantsearch";
import { useState } from "react";

const searchClient = algoliasearch(
	"0EP2Y7UUUX",
	"ae611d14f0b56aaa064f6cce5bbaa7ff"
);

function Hit({ hit }: any) {
	return (
		<a
			href="#"
			className="block h-full px-2 py-4 mb-3 bg-white group dark:bg-bg-secondary-dark dark:rounded-3xl rounded-3xl"
		>
			<div className="flex flex-row">
				<div className="bg-white w-[200px] h-[150px] rounded-[16px]">
					<img className="object-contain w-full h-full" src={hit.image} />
				</div>
				<div className="flex justify-between w-full px-3 mt-3 text-sm">
					<div className="flex flex-col w-full gap-3">
						<h3 className="font-medium text-gray-900 dark:text-gray-300 group-hover:underline group-hover:underline-offset-4 line-clamp-2">
							{hit.title}
						</h3>
						<div className="flex flex-row items-center justify-between">
							<span className="text-xl font-black dark:text-gray-200">
								${Number(hit.price).toFixed(2)}
							</span>
							<span className="text-sm font-black text-green-700 dark:text-green-400 update-font">
								Updated {(hit.updated_at).slice(5, 10)}
							</span>
						</div>
						<a className="flex items-center justify-center block w-full p-2 font-black text-white transition rounded shadow-xl bg-accent dark:bg-accent-dark hover:bg-dark-900 hover:bg-opacity-90 dark:hover:bg-opacity-90 font-semibold"
							href={hit.link}
							target="_blank"
							rel="noopener noreferrer"
						>
							View on Retailer &nbsp;<span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
			</div>
		</a>
	);
}

function HitsGrid(props: any) {
	const { hits } = useHits(props);
	return (
		<div>
			<div className="w-full">
				<ol>
					{hits.map((hit) => {
						return <Hit key={hit.objectID} hit={hit} />;
					})}
				</ol>
			</div>
		</div>
	);
}

export default function Home() {
	const [filtersVisible, setFiltersVisible] = useState(false);
  const toggleDarkMode = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };


	return (
    
		<InstantSearch
			searchClient={searchClient}
			indexName="amazon_testing"
			insights={true}
      
		>
			<div className="flex flex-col gap-3 ">
				<SearchBox 
          placeholder="Search for deals"
        />
				<div className="flex flex-col w-full h-full gap-3 md:flex-row">
					<button
						className="flex flex-col gap-3 py-3 text-sm font-bold text-gray-700 rounded rounded-lg bg-bg-secondary dark:text-gray-200 dark:bg-bg-secondary-dark"
						onClick={(e) => {
							if (e.target === e.currentTarget) return;
							e.preventDefault();
							setFiltersVisible(!filtersVisible);
						}}
					>
						<div className="flex flex-col w-full px-4">
							<div className="flex flex-col items-start items-center w-full h-full my-4 rounded-md sm:flex-row md:flex-col">
								<div className="p-3 rounded-md">
									<RefinementList
										attribute="category"
										searchablePlaceholder="Search categories"
										showMore={true}
										searchable={true}
										classNames={{
											root: "flex flex-col gap-1 ",
											list: "items-start flex flex-col",
											labelText: "mx-2",
										}}
									/>
								</div>
								<div className="flex flex-col h-full gap-3 p-3 rounded-md">
									<div className="flex flex-col">
										<div className="flex flex-row items-center justify-between">
											<span className="text-sm font-bold">Used Price</span>
										</div>
										<RangeInput
											attribute="price"
											min={0}
											max={10000}
											precision={0}
											className="w-full p-2"
										/>
									</div>
									<div className="flex flex-col">
										<div className="flex flex-row items-center justify-between">
											<span className="text-sm font-bold">New Price</span>
										</div>
										<RangeInput
											attribute="price"
											min={0}
											max={10000}
											precision={2}
											className="w-full p-2"
										/>
									</div>
								</div>
							</div>
						</div>
					</button>
					<div className="flex flex-col w-full h-full gap-2">
						<CurrentRefinements />
						<HitsGrid />
						<Pagination />
						<HitsPerPage
							items={[
								{ label: "5 hits per page", value: 5 },
								{ label: "10 hits per page", value: 10, default: true },
								{ label: "20 hits per page", value: 20 },
							]}
						/>
					</div>
				</div>
			</div>
		</InstantSearch>
	);
}
