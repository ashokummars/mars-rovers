import Link from 'next/link';
import { useRouter } from 'next/router';

const Pagination = ( props ) => {
	const router = useRouter()
	const paginations = batches( props.resultsSize );
	return(
		<div className="pagination">
			<div className="prev">
				<button>&lt;</button>
			</div>
			<div className="pages">
				{ paginations.map( page =>  
					<Link key={ page } href={"/images/[rover]?status=" + router.query.status + "&camera=" + router.query.camera + "&martianSol=" + router.query.martianSol + "&page=" + page} as={`/images/${ router.query.rover }?status=${ router.query.status }&camera=${ router.query.camera }&martianSol=${ router.query.martianSol }&page=${ page }`}>
						<a className="page">{ page }</a>
					</Link>)
				}
				
			</div>
			<div className="next">
				<button>&gt;</button>
			</div>

			<style jsx>{`
				div.pages{
					width: 200px;
    				overflow-y: scroll;
    				display: initial;
				}

				div.pagination{
					display: flex;
					padding: 10px 0;
				}

				a.page{
						margin: 5px 5px;
					}
			`}</style>
			
		</div>
	)
}

const batches = function( resultsSize ) {
	let paginationArray = [];
	let page = 1;
	for(let i=0; i<resultsSize; i=i+10){
		paginationArray.push( page );
		page++;
	}

	return paginationArray;
}

export default Pagination;