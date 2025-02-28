// 言語ディレクトリ内のルートの型定義
export interface LanguageRoute {
	path: string; // ルートパス（例: /ja/about）
	fullPath: string; // 完全なファイルパス
	name: string; // ルート名（例: about）
}

/**
 * [lang]ディレクトリ以下のすべてのルーティングを取得する
 * @returns 言語ディレクトリ内のルートの配列
 */
export function getRoutePathsInLanguage(): LanguageRoute[] {
	// index.tsxと[＊].tsxのみを取得するように正規表現を修正

	const allRoutes = import.meta.glob("@/routes/[lang]/**/*{index,[*]}.tsx", {
		eager: true,
	});

	return Object.entries(allRoutes).map(([fullPath]) => {
		// ../routes/[lang]/ja/about/index.tsx のようなパスから情報を抽出
		const pathParts = fullPath.replace("/app/routes/", "").split("/");

		// ファイル名を除いたパスを取得
		const fileName = pathParts[pathParts.length - 1];
		const name = fileName.includes(".")
			? fileName.substring(0, fileName.lastIndexOf("."))
			: fileName;

		// ルートパスを構築（/ja/about のような形式）
		const filteredParts = pathParts
			.slice(1, -1) // [lang]とファイル名を除外
			.filter((part) => part !== "index"); // 中間ディレクトリのindexを除外

		const routePath = `/${filteredParts.join("/")}`;
		const finalPath = name === "index" ? routePath : `${routePath}/${name}`;

		return {
			path: finalPath,
			fullPath,
			name: name === "index" ? pathParts[pathParts.length - 2] || "" : name,
		};
	});
}
