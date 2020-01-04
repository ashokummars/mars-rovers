import fetch from 'isomorphic-unfetch';

import App, { container } from 'next/app';
import Link from 'next/link';

import RoverDetails from '../components/roverDetails';
import Layout from '../components/layout';

export default class Rover extends App{

	constructor( props ){
		super( props );

		this.state = {
			rover: '',
			roverName: '',
			camera: '',
			martianSol: '',
			loading: false
		}

		this.onRoverChange = this.onRoverChange.bind( this );
		this.onCameraChange = this.onCameraChange.bind( this );
		this.onMartianSolChange = this.onMartianSolChange.bind( this );
	}

	render(){


		const selectedRover = this.state.rover ? this.props.rovers[ this.state.rover ] : {};

		return(
			<Layout>
				<div className="nasa-imagery-search">

					{ !this.props.loading ? <div className="loading"/> : '' }

					<div>
						<div className="row">
							<span>Select Rover</span>
							<span>
								<select onChange={ this.onRoverChange }>
								<option>Please Choose</option>
								{
									this.props.rovers.map( ( rover, index ) => (
										
										<option value={ index } key={ index }>{ rover.name }</option>
										
									))
								}
								</select>
							</span>
						</div>

						{ this.state.rover && this.state.rover.length > 0 ? 
							<>
								<div className="row">
									<span> Select Camera </span>
									<span>
										<select onChange={ this.onCameraChange }>
											<option>Please Choose</option>
											{
												this.props.rovers[ this.state.rover ].cameras.map(  c  => 

													<option value={ c.name } key={ c.name }>{ c.full_name }</option>
												
											 	) 
											}
										</select>
									</span>
								</div>

								<div className="row">
									<span>Enter Martial Sol</span>
									<span>
										<input type="text" onChange={ this.onMartianSolChange }/>
									</span>
								</div>


								<div className="row">
									<span>
										<Link href={"/images/[rover]?status=" + selectedRover.status + "&camera=" + this.state.camera + "&martianSol=" + this.state.martianSol } as={`/images/${ this.state.roverName }?status=${ selectedRover.status }&camera=${ this.state.camera }&martianSol=${ this.state.martianSol }`}>
										{/*<Link href={{ pathname: `/images/${ this.state.roverName }`, query: { status: `${ selectedRover.status }`, camera: `${ this.state.camera }`, martianSol: `${ this.state.martianSol }` }}}>*/}
											<a>Submit</a>
										</Link>
									</span>
								</div>
							</>

							: '' }
						</div>
					
					{ this.state.rover && this.state.rover.length > 0 ? <RoverDetails name={ selectedRover.name } launch_date={ selectedRover.launch_date } landing_date={ selectedRover.landing_date } status={ selectedRover.status } total_photos={ selectedRover.total_photos }/> : '' }


					<style jsx>{`
						div.row{
							margin: 10px 0
						}
						div.row span:first-child{
							font-weight: bold;
							width: 150px;
							display: inline-block;
						}

						div.nasa-imagery-search{
							display: grid;
						    grid-template-columns: 1fr 200px;
						    grid-gap: 15px;
						}


						@media (max-width: 768px){
							div.nasa-imagery-search{
								grid-template-columns: repeat(1, 1fr);
						    }
						}
						
					`}
					</style>

				</div>
			</Layout>

		)
	}

	static async getInitialProps() {
		
		const res = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=adO1eHxyqLrNXlJuTS1wvVTHMh7iDZ9bz6geRvYp');
		const rovers = await res.json();


		return { rovers: rovers.rovers, loading: true };
	}

	onRoverChange( event ){

		this.setState({
			...this.state,
			rover: event.target.value,
			roverName: this.props.rovers[ event.target.value ].name
		})
	}

	onCameraChange( event ){

		this.setState({
			...this.state,
			camera: event.target.value
		})
	}

	onMartianSolChange( event ) {
		this.setState({
			...this.state,
			martianSol: event.target.value
		})
	} 
}