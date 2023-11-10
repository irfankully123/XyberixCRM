import { useQuery } from "@tanstack/react-query";
import ApiConstants from "@/ApiConstants/ApiConstants.js";

class TaskService {

    static getTasks = async (query) => {
        const response = await ApiConstants.get("tasks", { params: query });
        return response.data;
    };

    static fetchTasks = (query) => {
        return useQuery({
            queryKey: ["tasks", query],
            queryFn: () => TaskService.getTasks(query),
        });
    };


}

export default TaskService;
