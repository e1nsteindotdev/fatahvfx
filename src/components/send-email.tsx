import {
	Body,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
	firstName: string,
	familyName: string,
	datetime: Date;
	authorEmail: string;
	desc: string;
}

//const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const EmailComponent = ({
	firstName,
	familyName,
	authorEmail,
	datetime,
	desc,
}: Props) => {
	const previewText = `From ${authorEmail ? authorEmail : " (email not found)"}`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>

			<Body style={main}>
				<Container style={container}>
					<Section style={{ paddingBottom: "20px" }}>
						<Row>
							<Text style={heading}>{previewText}</Text>
							<Text style={heading}>{familyName} {firstName}</Text>
							<Text style={review}>message: {desc}</Text>
						</Row>
					</Section>

					<Hr style={hr} />

					<Section>
						<Row>
							<Text style={footer}>
								{datetime ? datetime.toString() : (new Date()).toString()}
							</Text>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default EmailComponent;

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "580px",
	maxWidth: "100%",
};

const heading = {
	fontSize: "25px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#484848",
};

const paragraph = {
	fontSize: "18px",
	lineHeight: "1.4",
	color: "#484848",
};

const review = {
	...paragraph,
	padding: "24px",
	backgroundColor: "#f2f3f3",
	borderRadius: "4px",
};
const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};

const footer = {
	color: "#9ca299",
	fontSize: "14px",
	marginBottom: "10px",
};
