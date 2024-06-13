import { useEffect, useMemo, useState } from 'react'
import { Button, Table, TablePaginationConfig } from 'antd'
import { useInView } from 'react-intersection-observer'

import { Filters, getColumns, getRows } from './utils/utils'
import styles from './styles.module.sass'
import { AddModal } from './AddModal'
import { getTableYScroll } from '../../shared/utils/scrollUtils.ts'
import { useGetUsersInfinite } from '../../shared/api/requests/users'
import { Api } from '../../shared/api/apiTypes.ts'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../shared/config/routes.ts'



export const Users = () => {
  const { ref, inView } = useInView()
  const navigate = useNavigate()

  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const toggleAddModal = () => setAddModalOpen((prev) => !prev)

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUsersInfinite({
     limit: 10
  })

  const mergedUsers = useMemo(() => data?.pages
    .reduce((acc, page) => {
      return [...acc, ...page.users]
    }, [] as Api.User[]), [data])

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, hasNextPage])

  const onRowClick = (id: string) => {
    navigate(ROUTES.USERS.USER.createPath(id))
  }

  const handleChange = (_: TablePaginationConfig, filters: Filters) => {
    setFilteredInfo(filters)
  }

  return (
    <div className={styles.main}>
      <div className={styles.toolbar}>
        <div className={styles.addBtns}>
          <Button
            type='primary'
            onClick={toggleAddModal}
          >
            Добавить пользователя
          </Button>
        </div>
      </div>

      <Table
        loading={ isLoading || isFetchingNextPage }
        sticky
        size="large"
        columns={ getColumns({filteredInfo, users: mergedUsers}) }
        dataSource={ getRows(mergedUsers || []) }
        className={ styles.table }
        bordered
        pagination={ false }
        scroll={ { y: getTableYScroll(200) } }
        onRow={ (record, index) => {
          if (mergedUsers && index === (mergedUsers?.length - 1)) {
            return { ref, onClick: () => onRowClick(record.id) }
          }
          return ({ onClick: () => onRowClick(record.id) })
        } }
        onChange={handleChange}
      />

      <AddModal
        isOpen={ isAddModalOpen }
        onClose={ toggleAddModal }
      />
    </div>
  )
}