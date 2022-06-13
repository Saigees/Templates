import { useParams } from "react-router-dom";
import Config from "../T.config";

export default function _redirects() {
    const { location } = useParams();
    const route = Config.redirects.find(f => f.route === location);
    if (route) {
        window.location.href = route.location;
    } else {
        window.location.href = "/"
    }
    
    return (
        <></>
    )
}