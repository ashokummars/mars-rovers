import fetch from 'isomorphic-unfetch';

import App from 'next/app';
import { withRouter } from 'next/router';
import Link from 'next/link';

import RoverDetails from '../../components/roverDetails';
import NoImages from '../../components/noimages';
import Pagination from '../../components/pagination';
import Layout from '../../components/layout';

class Images extends App{

	constructor( props ){
		super( props );
		this.state = {
			images: []
		}
	}

	
	render = () => {

		/*if( this.props && this.props.photos ) {
			this.setState({
				...state,
				photos: this.props.photos
			})
		}*/
		const page = this.props && this.props.route && this.props.route.query.page || 1;
		console.log( page )
		const photos = this.props.photos || [];
		const batchRecords = photos.slice( page-1, 10) || [];

		console.log( batchRecords );

		return(
			<Layout>
				<Link href="/">
					<a>Back</a>
				</Link>

				<RoverDetails name={ this.props.router.query.rover }/>

				<div className="gallery">
					{
						batchRecords.map( ( photo, index ) => (
							
							<div className="gallery-div" key={ photo.id }>
								<picture>
									<source srcSet={ photo.img_src } className="gallery-img"/>
									<img src={ photo.img_src } key={ photo.id } className="gallery-img"/>
								</picture>
							</div>
							
						))
					}
				</div>

				{
					this.props && this.props.photos.length === 0 ? <NoImages/> : ''
				}

				{ this.props.photos.length > 10 ?
					<Pagination resultsSize={ this.props.photos.length } 
						roverName = { this.props.router.query.rover } 
						status = { this.props.router.query.status } 
						camera = { this.props.router.query.camera }
						martianSol = { this.props.router.query.martianSol }/>
					: ''
				}

				<style jsx>{`
					div.gallery{
						display: grid;
					    grid-template-columns: repeat(4, 1fr);
					    grid-gap: 15px;
					}

					img{
						width: 100%;
						height: 100%;
						display: block;
					}

					@media (max-width: 768px){
						div.gallery{
							grid-template-columns: repeat(2, 1fr);
					    }
					}

					@media (max-width: 768px){
						div.gallery{
							grid-template-columns: repeat(2, 1fr);
					    }
					}

					@media (max-width: 480px){
						div.gallery{
							grid-template-columns: repeat(1, 1fr);
					    }
					}
				`}
				</style>
			</Layout>
		)
	}


	static async getInitialProps( context ){
		const { rover, camera, martianSol, limit } = context.query;

		console.log(context)
		let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?';
		if( camera ){
			url += '&camera='+camera;
		}
		console.log( martianSol );
		if( martianSol ) {
			url += '&sol=' + martianSol;
		}

		const res = await fetch( url + '&api_key=adO1eHxyqLrNXlJuTS1wvVTHMh7iDZ9bz6geRvYp' );
		const photos = await res.json();

		console.log( url );

		return { photos: photos.photos };
	}
}

export default withRouter( Images );