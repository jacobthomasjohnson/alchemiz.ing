import { OverlayScrollbars } from "overlayscrollbars"
import { DebugMenu } from "./DebugMenu"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

export function EventLog() {
      return (
            <OverlayScrollbarsComponent
                  options={{
                        className: "os-theme-dark", // Predefined dark theme
                        scrollbars: {
                              autoHide: "scroll", // Auto-hide scrollbar when not in use
                              autoHideDelay: 100, // Delay before hiding
                        },
                  }}
                  className="h-full overflow-hidden bottom-0"
            >
                  <DebugMenu />
            </OverlayScrollbarsComponent>
      )
}