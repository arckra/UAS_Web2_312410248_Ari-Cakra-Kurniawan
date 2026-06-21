<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    /**
     * Do whatever processing this filter needs to do.
     * By default it should not return anything during
     * normal execution. However, when an abnormal state
     * is found, it should return an instance of
     * CodeIgniter\HTTP\Response. If it does, script
     * execution will end and that Response will be
     * sent back to the client, allowing for error pages,
     * redirects, etc.
     *
     * @param RequestInterface $request
     * @param array|null       $arguments
     *
     * @return RequestInterface|ResponseInterface|string|void
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        // ❌ kalau tidak ada token → 401
        if (!$authHeader) {
            return service('response')->setJSON([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'Token tidak ditemukan'
            ])->setStatusCode(401);
        }

        $token = explode(" ", $authHeader);

        // ❌ format salah
        if (count($token) !== 2) {
            return service('response')->setJSON([
                'status' => 401,
                'error' => 'Unauthorized',
                'message' => 'Format token salah (Bearer token)'
            ])->setStatusCode(401);
        }

        // ❌ token kosong
        if ($token[1] == "") {
            return service('response')->setJSON([
                'message' => 'Token kosong'
            ])->setStatusCode(401);
        }

        // (kalau kamu sudah pakai JWT decode, baru tambahkan di sini)
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // tidak dipakai
    }

    /**
     * Allows After filters to inspect and modify the response
     * object as needed. This method does not allow any way
     * to stop execution of other after filters, short of
     * throwing an Exception or Error.
     *
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @param array|null        $arguments
     *
     * @return ResponseInterface|void
     */
}
