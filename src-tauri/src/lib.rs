use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopAppInfo {
    app_name: String,
    app_version: String,
    bridge_status: String,
}

#[tauri::command]
fn get_desktop_app_info(app: tauri::AppHandle) -> DesktopAppInfo {
    let package_info = app.package_info();

    DesktopAppInfo {
        app_name: package_info.name.clone(),
        app_version: package_info.version.to_string(),
        bridge_status: "connected".to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_desktop_app_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
