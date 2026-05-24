import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/libs/auth/client";
import { client } from "@/libs/orpc/client";
import { createNoindexFollowMeta } from "@/libs/seo";

export const Route = createFileRoute("/admin/")({
	component: AdminPage,
	beforeLoad: async ({ context }) => {
		if (!context.session) throw redirect({ to: "/auth/login", replace: true });
		const role = context.session.user?.role;
		if (role !== "admin") throw redirect({ to: "/dashboard", replace: true });
	},
	head: () => ({
		meta: [createNoindexFollowMeta(), { title: "Admin Panel — ResumeHub.in" }],
	}),
});

type AdminUser = {
	id: string;
	name: string;
	email: string;
	role: string | null;
	banned: boolean | null;
	banReason: string | null;
	createdAt: string;
	resumeCount: number;
};

type AdminStats = {
	totalUsers: number;
	totalResumes: number;
	usersByRole: { admin: number; pro: number; free: number };
};

function AdminPage() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [stats, setStats] = useState<AdminStats | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			const [usersData, statsData] = await Promise.all([
				client.admin.listUsers(),
				client.admin.stats(),
			]);
			setUsers(usersData as any);
			setStats(statsData as any);
		} catch (error) {
			toast.error("Failed to load admin data");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleRoleChange = async (userId: string, newRole: "admin" | "pro" | "free") => {
		try {
			await client.admin.updateUserRole({ id: userId, role: newRole });
			toast.success(`Role updated to ${newRole}`);
			await fetchData();
		} catch (error) {
			toast.error("Failed to update role");
			console.error(error);
		}
	};

	const handleBanToggle = async (userId: string, currentlyBanned: boolean) => {
		try {
			await client.admin.banUser({
				id: userId,
				banned: !currentlyBanned,
				banReason: !currentlyBanned ? "Banned by admin" : undefined,
			});
			toast.success(currentlyBanned ? "User unbanned" : "User banned");
			await fetchData();
		} catch (error: any) {
			toast.error(error?.message ?? "Failed to update ban status");
			console.error(error);
		}
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-muted-foreground">Loading admin panel...</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-7xl p-6">
			<h1 className="mb-6 font-bold text-3xl">Admin Panel</h1>

			{/* Stats Section */}
			{stats && (
				<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<StatCard label="Total Users" value={stats.totalUsers} />
					<StatCard label="Total Resumes" value={stats.totalResumes} />
					<StatCard label="Admin Users" value={stats.usersByRole.admin} />
					<StatCard label="Pro Users" value={stats.usersByRole.pro} />
				</div>
			)}

			{/* Users Table */}
			<div className="overflow-x-auto rounded-lg border">
				<table className="w-full text-left text-sm">
					<thead className="border-b bg-muted/50">
						<tr>
							<th className="px-4 py-3 font-medium">Email</th>
							<th className="px-4 py-3 font-medium">Name</th>
							<th className="px-4 py-3 font-medium">Role</th>
							<th className="px-4 py-3 font-medium">Resumes</th>
							<th className="px-4 py-3 font-medium">Status</th>
							<th className="px-4 py-3 font-medium">Created</th>
							<th className="px-4 py-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className="border-b last:border-b-0 hover:bg-muted/30">
								<td className="px-4 py-3 font-mono text-xs">{user.email}</td>
								<td className="px-4 py-3">{user.name}</td>
								<td className="px-4 py-3">
									<RoleSelect
										value={normalizeRole(user.role)}
										onChange={(role) => handleRoleChange(user.id, role)}
									/>
								</td>
								<td className="px-4 py-3 text-center">{user.resumeCount}</td>
								<td className="px-4 py-3">
									{user.banned ? (
										<span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
											Banned
										</span>
									) : (
										<span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
											Active
										</span>
									)}
								</td>
								<td className="px-4 py-3 text-xs text-muted-foreground">
									{new Date(user.createdAt).toLocaleDateString()}
								</td>
								<td className="px-4 py-3">
									<button
										type="button"
										onClick={() => handleBanToggle(user.id, !!user.banned)}
										className={`rounded px-2 py-1 text-xs font-medium ${
											user.banned
												? "bg-green-600 text-white hover:bg-green-700"
												: "bg-red-600 text-white hover:bg-red-700"
										}`}
									>
										{user.banned ? "Unban" : "Ban"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-lg border bg-card p-4">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="font-bold text-2xl">{value}</p>
		</div>
	);
}

function normalizeRole(role: string | null): "admin" | "pro" | "free" {
	if (role === "admin") return "admin";
	if (role === "pro") return "pro";
	return "free";
}

function RoleSelect({
	value,
	onChange,
}: {
	value: "admin" | "pro" | "free";
	onChange: (role: "admin" | "pro" | "free") => void;
}) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value as "admin" | "pro" | "free")}
			className="rounded border bg-background px-2 py-1 text-xs"
		>
			<option value="free">Free</option>
			<option value="pro">Pro</option>
			<option value="admin">Admin</option>
		</select>
	);
}
