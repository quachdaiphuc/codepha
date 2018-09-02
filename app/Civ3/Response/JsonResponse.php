<?php

namespace App\Civ3\Response;

class JsonResponse
{
    /**
     * Status code of response
     *
     * @var int
     */
    protected $statusCode;

    /**
     * Main message for response
     *
     * @var string
     */
    protected $mainMessage;

    /**
     * Addition data for response
     *
     * @var array
     */
    protected $attach;

    /**
     * Create meta data for response
     *
     * @param string $mainMessage
     * @param array $otherMessage
     *
     * @return array
     */
    private function createMetaData($mainMessage, $otherMessage = null)
    {
        $metaData = [
            'message' => [
                'main' => $mainMessage,
            ],
        ];
        if ($otherMessage != null) {
            $metaData['message']['other'] = $otherMessage;
        }

        return $metaData;
    }

    /**
     * Response a json
     *
     * @param string $mainMessage
     * @param int $statusCode
     * @param array $otherMessage
     *
     * @return Response
     */
    public function response($mainMessage, $statusCode, $otherMessage = null)
    {
        if (sizeof($this->attach)) {
            $response['data'] = $this->attach;
        }
        $response['meta'] = $this->createMetaData($mainMessage, $otherMessage);

        return response()->json($response, $statusCode);
    }

    /**
     * Attach data to response
     *
     * @param array $data
     *
     * @return this
     */
    public function attach($data)
    {
        $this->attach = $data;

        return $this;
    }

    /**
     * Response json success
     *
     * @param string $mainMessage
     * @param int $statusCode
     *
     * @return Response
     */
    public function success($mainMessage = 'OK', $statusCode = 200)
    {
        return $this->response($mainMessage, $statusCode);
    }

    public function badRequest($mainMessage, $statusCode = 400)
    {
        return $this->response($mainMessage, $statusCode);
    }

    public function notFound($mainMessage = 'Resource not found', $statusCode = 404)
    {
        return $this->response($mainMessage, $statusCode);
    }

    public function updated($mainMessage = 'OK', $statusCode = 202)
    {
        return $this->response($mainMessage, $statusCode);
    }
}
