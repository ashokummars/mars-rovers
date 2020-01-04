import Layout from './layout';

const Error = ( props ) => (
	<Layout>
		<>
			<div>{ props.errorMessage }</div>
			<style jsx>{`
				div{
					margin: 10px auto;
				    display: table;
				    border: 1px solid #777777;
				    padding: 10px;
				    color: red
				}
			`}
			</style>
		</>
	</Layout>
)

export default Error;