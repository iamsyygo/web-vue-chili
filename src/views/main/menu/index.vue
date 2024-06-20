<template>
  <div class="p-10px w-full h-full menu-box">
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <a-tree :tree-data="treeData" :field-names class="p-10px" blockNode :expanded-keys="['/main']">
      <template #title="item">
        <div>
          <span>{{ item.name }}</span>
          <div class="menu-item-btns">
            <a-button
              size="small"
              type="text"
              :loading="requesting && foucsRow === item"
              @click="openFormDrawer(item, 'add')"
              >新增</a-button
            >
            <a-button
              size="small"
              type="text"
              :loading="requesting && foucsRow === item"
              @click="openFormDrawer(item, 'edit')"
              >编辑</a-button
            >
            <a-popconfirm title="您确定要删除这个菜单吗?" ok-text="确定" cancel-text="取消" @confirm="ondelete(item)">
              <a-button type="text" size="small">删除</a-button>
            </a-popconfirm>
          </div>
        </div>
      </template>
    </a-tree>
    <a-drawer v-model:open="visible" title="编辑角色" width="50%">
      <FormMaster v-model:model="formModel" ref="formRef" :items :form-props>
        <template #parentId="item">
          <a-tree-select
            v-model:value="formModel[item.name]"
            style="width: 100%"
            :tree-data="treeData"
            :field-names="fieldNames"
            placeholder="请选择"
          >
          </a-tree-select>
        </template>
        <template #roles="item">
          <a-select v-model:value="formModel[item.name]" style="width: 100%" mode="multiple" placeholder="请选择">
            <a-select-option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
        </template>
        <template #icon="item">
          <a-select
            v-model:value="formModel[item.name]"
            style="width: 100%"
            placeholder="请选择"
            :options="item.props.options"
          >
            <template #option="{ value, label }">
              <symbol-icon :icon="value" />
              &nbsp;&nbsp;{{ label }}
            </template>
            <template #tagRender="{ value, label }">
              <symbol-icon :icon="value" />
              &nbsp;&nbsp;{{ label }}
            </template>
          </a-select>
        </template>
      </FormMaster>
      <template #footer>
        <a-space warp>
          <a-button @click="visible = false">取消</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import { deleteMenu, fetchRoleAll } from '@/api';
import { MenuData, addMenu, getMenuById, getSysMenus } from '@/api/menu.api';
import { RoleData } from '@/api/role.api';
import FormMaster from '@/components/form-master/index.vue';
import { useAppMenu2RouteStore } from '@/store/app-menu';
import { FormProps, Modal, message } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { formItems as items } from './formItems';

const appMenu2Route = useAppMenu2RouteStore();
const searchValue = ref<string>('');
const treeData = computed(() => appMenu2Route.menus);
const fieldNames = {
  children: 'children',
  title: 'name',
  label: 'name',
  key: 'path',
  value: 'id',
};

watch(searchValue, (value) => {});
const visible = ref(false);
const formModel = ref<Partial<Record<(typeof items)[number]['name'], any>>>({});
const formProps: FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
  rules: {},
};

const requesting = ref(false);
let foucsRow = {};
const openFormDrawer = async (item: any, type: 'add' | 'edit' | 'delete') => {
  foucsRow = item;
  requesting.value = true;
  let menuData: Partial<MenuData> = item;
  if (type !== 'add') {
    menuData = await getMenuById(item.id).finally(() => {
      requesting.value = false;
    });
  }
  const isAdd = type === 'add';
  formModel.value = {
    sort: 0,
    status: '1',
    ...(isAdd ? {} : menuData),
    parentId: isAdd ? menuData.id : menuData.parentId,
    // @ts-expect-error
    level: isAdd ? (menuData.level || 0) + 1 : menuData.level,
    roles: isAdd ? [] : menuData.roles?.map((role) => role.id),
  };
  visible.value = true;
};

const formRef = ref<GenericComponentExports<typeof FormMaster>>();
function onSubmit() {
  formRef.value?.submit().then((params: MenuData) => {
    Modal.confirm({
      title: '确认提交',
      content: '请确认是否执行提交？',
      centered: true,
      onOk() {
        addMenu({
          ...params,
        }).then(() => {
          updateSysMenu();
          message.success('提交成功');
          visible.value = false;
        });
      },
    });
  });
}

function updateSysMenu() {
  getSysMenus()
    .then((data) => {
      const appMenuStore = useAppMenu2RouteStore();
      appMenuStore.$patch({ menus: data.menus, mpaths: data.paths });
      const path = location.pathname;
      appMenuStore.initializeRoutes(path);
    })
    .finally(() => {});
}
const roles = ref<RoleData[]>([]);
const getRoles = async () => {
  const data = await fetchRoleAll();
  roles.value = data;
};
getRoles();

function ondelete(item: any) {
  deleteMenu(item.id).then(() => {
    updateSysMenu();
    message.success('删除成功');
  });
}
</script>
<style scoped lang="scss">
:deep(.ant-tree-node-content-wrapper) {
  padding: 0 5px;
}

:deep(.ant-tree-node-content-wrapper):hover .menu-item-btns {
  opacity: 1;
  transition: opacity 0.3s;
}
.menu-item-btns {
  // display: none;
  opacity: 0;
  float: right;
  a-button {
    margin-right: 5px;
  }
}
</style>
