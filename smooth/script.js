// アンカーリンクのスムーススクロールを設定
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	// 各アンカーリンクにクリックイベントを追加
	anchor.addEventListener('click', function (e) {
			e.preventDefault(); // デフォルトのリンク動作を無効化

			// クリックされたリンクのターゲット要素を取得
			const target = document.querySelector(this.getAttribute('href'));
			// ターゲットの表示位置を調整
			const targetTop = target.offsetTop - document.getElementById('navbar').offsetHeight + 1;

			// スムーススクロールを適用
			window.scrollTo({
					top: targetTop,
					behavior: 'smooth'
			});

			// 対応するナビゲーションリンクをアクティブにする
			document.querySelectorAll('#navbar a').forEach(link => {
					link.classList.remove('active'); // すべてのリンクのアクティブクラスを削除
			});
			this.classList.add('active'); // クリックされたリンクにアクティブクラスを追加
	});
});

// スクロール位置に応じてナビゲーションリンクをアクティブにする
window.addEventListener('scroll', () => {
	const navLinks = document.querySelectorAll('#navbar a'); // ナビゲーションリンクの取得
	const sections = document.querySelectorAll('section'); // 各セクションの取得

	let inView = false; // セクションがビューポート内にあるかどうかのフラグ

	// 各セクションごとに処理
	sections.forEach(section => {
			const top = section.offsetTop - document.getElementById('navbar').offsetHeight; // セクションのトップ位置
			const bottom = top + section.offsetHeight; // セクションのボトム位置

			// セクションがビューポート内にある場合、対応するナビゲーションリンクをアクティブにする
			if (window.scrollY >= top && window.scrollY < bottom) {
					inView = true; // フラグをセット
					navLinks.forEach(link => {
							link.classList.remove('active'); // すべてのリンクのアクティブクラスを削除
					});
					// セクションに対応するリンクにアクティブクラスを追加
					document.querySelector(`#navbar a[href="#${section.id}"]`).classList.add('active');
			}
	});

	// ヘッダーの下部にスクロールした場合、またはセクションがビューポート内にない場合、すべてのアクティブリンクを解除
	if (window.scrollY < document.getElementById('navbar').offsetHeight - 1 || !inView) {
			navLinks.forEach(link => {
					link.classList.remove('active'); // すべてのリンクのアクティブクラスを削除
			});
	}
});



// このスクリプトは、ページ内のアンカーリンク（ページ内リンク）をクリックした際のスムーズスクロールと、スクロール位置に応じてナビゲーションメニューのリンクのアクティブ状態を制御するためのものです。
// 1.
// アンカーリンクのスムーススクロール：ページ内のアンカーリンク（href属性が"#"で始まるリンク）をクリックすると、指定されたセクションまでスムーズにスクロールします。クリックされたリンクには"active"クラスが追加され、他のリンクから"active"クラスが削除されます。
// 2.
// スクロール位置に応じたナビゲーションメニューの制御：ページをスクロールすると、現在の表示位置に応じてナビゲーションメニューのリンクのアクティブ状態が変化します。表示されているセクションに対応するリンクには"active"クラスが追加され、他のリンクから"active"クラスが削除されます。ただし、ページのヘッダー部分にスクロールした場合やセクションが画面内に表示されていない場合は、すべてのリンクの"active"クラスが削除されます。

// このように、スクリプトはページ内のナビゲーションをスムーズかつ使いやすくするための動作を実現しています。
