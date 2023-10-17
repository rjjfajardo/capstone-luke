import NonLoginForm from "@/components/templates/Layout/NonLoginFormLayout";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Session } from "next-auth";

import { useHooks } from "./hooks";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";

export default function LoginPage() {
	const {
		control,
		errors,
		handleSubmit,
		showPassword,
		handleClickShowPassword,
		onSubmitLogin,
	} = useHooks();

	return (
		<NonLoginForm sx={{ alignItems: "center" }}>
			<Stack direction="column" spacing={2}>
				<Typography fontWeight={500} fontSize={20} textAlign="center">
					Log In
				</Typography>
				<form onSubmit={handleSubmit(onSubmitLogin)}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						render={({
							field: { onChange, value },
							fieldState: { invalid },
						}) => (
							<TextField
								name="email"
								fullWidth
								label="Email Address"
								value={value}
								onChange={(value) => onChange(value)}
								helperText={
									errors.email && (
										<p>{errors.email?.message}</p>
									)
								}
								sx={{ mb: 3 }}
								error={invalid}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({
							field: { onChange, value },
							fieldState: { invalid },
						}) => (
							<TextField
								fullWidth
								label="Password"
								name="password"
								value={value}
								helperText={
									errors.password && (
										<p>{errors.password?.message}</p>
									)
								}
								error={invalid}
								onChange={(value) => onChange(value)}
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								sx={{ mb: 3 }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
											>
												{showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{
								fontSize: "12px",
								color: "red",
								align: "center",
								mb: 2,
							}}
						/>
					</Box>
					<Button
						variant="contained"
						type="submit"
						fullWidth
						sx={{ py: 2, fontSize: 16, fontWeight: 500 }}
					>
						Log In
					</Button>
				</form>
			</Stack>
		</NonLoginForm>
	);
}

export async function getServerSideProps(context: CtxOrReq) {
	const session = await getSession(context);
	if (session) {
		return {
			redirect: {
				destination: "/dashboard",
			},
		};
	}

	return {
		props: {},
	};
}
