import React from 'react'
import { StyledFirebaseAuth } from 'react-firebaseui'
import { getUiConfig } from '../../firebase'
import { withFirebase } from '../FirebaseContext'

const SignIn = ({ firebase }) => (
	<div>
		<div
			style={{
				margin: '0 auto',
				maxWidth: 960,
				padding: '1.45rem 1.0875rem',
			}}
		>
			<h4>Hey, please login to continue</h4>
			<h5>This is just firebase login test</h5>
		</div>
		<StyledFirebaseAuth
			uiConfig={getUiConfig(firebase)}
			firebaseAuth={firebase.auth()}
		/>
	</div>
)

export default withFirebase(SignIn)
