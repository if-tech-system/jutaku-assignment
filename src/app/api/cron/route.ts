// 参考：https://vercel.com/docs/cron-jobs/quickstart
// 毎分実行 * * * * *
// 毎時実行 0 * * * *
// 毎日実行 0 0 * * *
// 注意：productionのみ有効&UTC時間
export async function GET() {
  console.log('Cron job executed', new Date())

  const result = await fetch(
    'http://worldtimeapi.org/api/timezone/America/Chicago',
    {
      cache: 'no-store'
    }
  )
  const data = await result.json()

  return Response.json({ datetime: data.datetime })
}
