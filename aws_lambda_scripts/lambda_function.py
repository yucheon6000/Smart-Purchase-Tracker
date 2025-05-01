import base64
import json


def lambda_handler(event, context):
    method = event['requestContext']['http']['method']
    if method == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            "body": ""
        }

    try:
        body = json.loads(event['body'])
        image_data = body.get('image')
        if image_data and image_data.startswith('data:image'):
            # base64 데이터 추출
            header, b64data = image_data.split(',', 1)
            img_bytes = base64.b64decode(b64data)
            # 예시: 가공된 구매 항목 리스트 반환
            purchase_items = [
                {
                    "id": "item100",
                    "name": "예시상품1",
                    "quantity": 2,
                    "unitPrice": 3000,
                    "totalPrice": 6000,
                    "categoryId": 2
                },
                {
                    "id": "item101",
                    "name": "예시상품2",
                    "quantity": 1,
                    "unitPrice": 5000,
                    "totalPrice": 5000,
                    "categoryId": 4
                }
            ]
            result_msg = f"이미지({len(img_bytes)} bytes) 수신 완료"
        else:
            purchase_items = []
            result_msg = "이미지 데이터 없음 또는 잘못된 형식"
    except Exception as e:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"result": result_msg, "purchaseItems": purchase_items})
    }
