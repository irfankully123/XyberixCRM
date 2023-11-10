<?php

namespace App\Http\Controllers\Api\V1;


use App\Http\Requests\PostInboxRequest;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Mail\SendNotification;
use App\Models\Inbox;

class NotificationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(PostInboxRequest $request): JsonResponse
    {
        $inbox = Inbox::create($request->validated());
        Mail::to($request->input('email'))->send(new SendNotification('Thank You For Contacting', $inbox->fullname));
        NotificationService::notify("Received An Email From  $inbox->fullname",$inbox->message ?: '');
        return response()->json(['message' => 'mail has been send']);
    }
}
