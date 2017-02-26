Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = require("./dom");
var constants_1 = require("./constants");
var registry = new Map();
var isBrowser = typeof window !== 'undefined' && !!window.document;
global[constants_1.ImportID] = global[constants_1.ImportID] || { registry: registry };
function register(moduleID, css) {
    if (!global[constants_1.ImportID].registry.has(moduleID) || global[constants_1.ImportID].registry.get(moduleID) !== css) {
        global[constants_1.ImportID].registry.set(moduleID, css);
        if (isBrowser)
            dom_1.default(moduleID, css);
    } // else: content is registered or unchanged --> noop
}
exports.register = register;
function get() {
    return global[constants_1.ImportID].registry;
}
exports.get = get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUFpQztBQUNqQyx5Q0FBdUM7QUFDdkMsSUFBTSxRQUFRLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDO0FBRWxGLElBQU0sU0FBUyxHQUFZLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUU3RSxNQUFjLENBQUMsb0JBQVEsQ0FBQyxHQUFJLE1BQWMsQ0FBQyxvQkFBUSxDQUFDLElBQUksRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO0FBR3RFLGtCQUF5QixRQUF5QixFQUFFLEdBQVc7SUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBRSxNQUFjLENBQUMsb0JBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUssTUFBYyxDQUFDLG9CQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0csTUFBYyxDQUFDLG9CQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN0RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFBQyxhQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxvREFBb0Q7QUFDMUQsQ0FBQztBQUxELDRCQUtDO0FBRUQ7SUFDSSxNQUFNLENBQUUsTUFBYyxDQUFDLG9CQUFRLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDOUMsQ0FBQztBQUZELGtCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwZGF0ZVN0eWxlcyBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBJbXBvcnRJRCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmNvbnN0IHJlZ2lzdHJ5OiBNYXA8bnVtYmVyIHwgc3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcDxudW1iZXIgfCBzdHJpbmcsIHN0cmluZz4oKTtcblxuY29uc3QgaXNCcm93c2VyOiBib29sZWFuID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3cuZG9jdW1lbnQ7XG5cbihnbG9iYWwgYXMgYW55KVtJbXBvcnRJRF0gPSAoZ2xvYmFsIGFzIGFueSlbSW1wb3J0SURdIHx8IHsgcmVnaXN0cnkgfTtcblxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIobW9kdWxlSUQ6IG51bWJlciB8IHN0cmluZywgY3NzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIShnbG9iYWwgYXMgYW55KVtJbXBvcnRJRF0ucmVnaXN0cnkuaGFzKG1vZHVsZUlEKSB8fCAoZ2xvYmFsIGFzIGFueSlbSW1wb3J0SURdLnJlZ2lzdHJ5LmdldChtb2R1bGVJRCkgIT09IGNzcykge1xuICAgICAgICAoZ2xvYmFsIGFzIGFueSlbSW1wb3J0SURdLnJlZ2lzdHJ5LnNldChtb2R1bGVJRCwgY3NzKTtcbiAgICAgICAgaWYgKGlzQnJvd3NlcikgdXBkYXRlU3R5bGVzKG1vZHVsZUlELCBjc3MpO1xuICAgIH0gLy8gZWxzZTogY29udGVudCBpcyByZWdpc3RlcmVkIG9yIHVuY2hhbmdlZCAtLT4gbm9vcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KCk6IE1hcDxudW1iZXIgfCBzdHJpbmcsIHN0cmluZz4ge1xuICAgIHJldHVybiAoZ2xvYmFsIGFzIGFueSlbSW1wb3J0SURdLnJlZ2lzdHJ5O1xufVxuIl19