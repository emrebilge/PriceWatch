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
			className="group block mb-3 px-2 py-4 dark:bg-bg-secondary-dark dark:rounded-3xl rounded-3xl bg-white h-full"
		>
			<div className="flex flex-row">
				<div className="bg-white w-[200px] h-[150px] rounded-[16px]">
					<img className="h-full w-full object-contain" src={hit.image} />
				</div>
				<div className="w-full mt-3 flex justify-between text-sm px-3">
					<div className="flex flex-col w-full gap-3">
						<h3 className="font-medium text-gray-900 dark:text-gray-300 group-hover:underline group-hover:underline-offset-4 line-clamp-2">
							{hit.title}
						</h3>
						<div className="flex flex-row justify-between items-center">
							<span className="text-xl font-black dark:text-gray-200">
								${Number(hit.price).toFixed(2)}
							</span>
							<span className="text-sm font-black text-green-700 dark:text-green-400">
								Save $1,540 (50%)
							</span>
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
			indexName="amazon"
			insights={true}
		>
			<div className="flex flex-col gap-3 ">
				<SearchBox />
				<div className="flex flex-col md:flex-row gap-3 h-full w-full">
					<button
						className="flex flex-col gap-3 bg-bg-secondary text-gray-700 dark:text-gray-200 dark:bg-bg-secondary-dark  py-3 rounded text-sm font-bold rounded-lg"
						onClick={(e) => {
							if (e.target === e.currentTarget) return;
							e.preventDefault();
							setFiltersVisible(!filtersVisible);
						}}
					>
						<div className="flex flex-col w-full px-4">
							<div className="flex flex-col items-center sm:flex-row md:flex-col my-4 items-start rounded-md w-full h-full">
								<div className="rounded-md p-3">
									<RefinementList
										attribute="category"
										searchablePlaceholder="Search categories"
										showMore={true}
										searchable={true}
										classNames={{
											root: "flex flex-col gap-1",
											list: "items-start flex flex-col",
											labelText: "mx-2",
										}}
									/>
								</div>
								<div className="flex flex-col gap-3 rounded-md p-3 h-full">
									<div className="flex flex-col">
										<div className="flex flex-row justify-between items-center">
											<span className="text-sm font-bold">Used Price</span>
										</div>
										<RangeInput
											attribute="price"
											min={0}
											max={10000}
											precision={2}
											className="w-full p-2"
										/>
									</div>
									<div className="flex flex-col">
										<div className="flex flex-row justify-between items-center">
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
					<div className="h-full w-full flex flex-col gap-2">
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
