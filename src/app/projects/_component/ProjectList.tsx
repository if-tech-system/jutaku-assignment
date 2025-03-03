'use client'
import React from 'react'
import { Box, Button, Title, Table } from '@mantine/core'

export const ProjectList = () => {
  return (
    <>
      <Title order={2} ta="center" mb="lg">
        案件一覧
      </Title>
      <Box mb="lg">
        <Button ml="auto" mr="0" display={'block'}>
          エントリー一覧
        </Button>
      </Box>

      <Table verticalSpacing="sm" withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th bg="blue.1" ta="center">
              案件作成日
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              案件名
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              概要
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              必要なスキル
            </Table.Th>
            <Table.Th bg="blue.1" ta="center">
              詳細
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td> </Table.Td>
            <Table.Td>案件マッチングアプリ</Table.Td>
            <Table.Td> </Table.Td>
            <Table.Td> </Table.Td>
            <Table.Td> </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  )
}
